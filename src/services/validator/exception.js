class Exception extends Error {

  constructor(field, messages) {
    super(field, messages);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, Error);
    }
    this.field = field;
    this.messages = messages;
  }

  getField() {
    return this.field
  }

  getMessage() {
    return this.messages
  }

}

export default Exception
