/* eslint-disable */
const phonenum_lib = require('google-libphonenumber');
const phone_number_format = phonenum_lib.PhoneNumberFormat;
const phone_util = phonenum_lib.PhoneNumberUtil.getInstance();
/* eslint-enable */

exports.handler = async (event) => {
  /*
    Lambda function to be used to sanitize/validate a phone number is the right
    format both so that the local version can be read back to the user, and
    the E164 standard can be used by Connect

    Input:
      event: Standard Amazon Connect JSON event. There are 2 parameters that can be
        configured to be passed via Connect

        phone_number - the users phone number, either in raw number format, or with
          the leading + if they are using the number they dialled in from
        country (optional)- The ISO code for the country the user is from. Given the
          complexity of deciphering the country it is better to encourage E164 format,
          but this is provided as n interface to allow cleaner decisions

    Output:
      result: JSON result of the invocation containing ths following:
        {
          "message": "SUCCESS" or "FAILURE" based on the outcome
          "sanitized_number": The requested number in NATIONAL format for reading back
            to the user
          "phone_number": The E164 format phone number that should be used
        }
  */
  console.log('Starting event with event', JSON.stringify(event));
  let response = {};
  try {
    const params = await retrieve_params(event);
    if (!('phone_number' in params)) {
      throw new Error('Phone number not provided!');
    }
    const phone_num = params.phone_number;
    let country_code = null;
    if ('country' in params) {
      country_code = params.country.toUpperCase();
    } else {
      country_code = 'NZ';
    }
    response = await sanitize_number(phone_num, country_code);
  } catch (exception) {
    console.error(exception);
    response = {
      'message': 'INVALID',
      'sanitized_number': '',
      'phone_number': '',
    };
  }
  console.log('Returning response', JSON.stringify(response));
  return response;
};

/**
  * This function handles the main encoding of the JUnit file.
  * @param {string} phone_number The phone number as extracted from the event
  * @param {string} country The ISO country code from the event, or NZ by default
  * @return {object} The parsing result
 */
function sanitize_number(phone_number, country) {
  console.log('At sanitize_number()...');
  return new Promise((resolve, reject) => {
    let parsed_num;
    try {
      if (phone_number.startsWith('0')) {
        parsed_num = phone_util.parse(phone_number, country);
      } else if (phone_number.startsWith('+')) {
        parsed_num = phone_util.parse(phone_number, null);
      } else {
        parsed_num = phone_util.parse('+' + phone_number, null);
      }
      const is_valid = phone_util.isValidNumber(parsed_num);
      const int_format = phone_util.format(parsed_num, phone_number_format.E164);
      // Trim any brackets, whitespace, bad characters that come along
      // in National Format so it can be read to the user
      const nat_format = phone_util.format(parsed_num, phone_number_format.NATIONAL)
          .replace('-', '').replace('(', '')
          .replace(')', '').replace(/\s/g, '');
      const response = {};
      console.log('Phone number is reported as', is_valid);
      if (is_valid) {
        response.message = 'SUCCESS';
      } else {
        response.message = 'INVALID';
      }
      response.sanitized_number = nat_format;
      response.phone_number = int_format;
      resolve(response);
    } catch (exception) {
      console.error(exception);
      reject(exception);
    }
  });
}

/**
  * This method handles retrieving the parameters as from an Amazon Connect
  * Event
  * @param {object} event The Event as Lambda receieved it
  * @return {object} The specific parameters from the given event
 */
function retrieve_params(event) {
  console.log('At retrieve_params()...');
  return new Promise((resolve, reject) => {
    try {
      const details = event.Details;
      const params = details.Parameters;
      resolve(params);
    } catch (exception) {
      reject(exception);
    }
  });
}
