import convict from 'convict';
import validator from 'convict-format-with-validator';

convict.addFormats(validator);

export default convict;
