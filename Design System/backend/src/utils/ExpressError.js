class ExpressError extends Error {
  
    constructor(status, message,success) {
      super(message);
      this.message = message;
      this.status = status;
      this.success=success 
    }
  }
  export default ExpressError;