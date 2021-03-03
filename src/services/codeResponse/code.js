const RESPONSE_CODE = {}

// backend intergration

// system
RESPONSE_CODE[RESPONSE_CODE["SYSTEM_ERROR"] = "5000"] = "Unknown error from server"

// login
RESPONSE_CODE[RESPONSE_CODE["ROOT_CREATE_WRONG_TOKEN"] = "ROOT_CREATE_4000"] = "Token is incorrect"
RESPONSE_CODE[RESPONSE_CODE["ROOT_CREATE_EXITED"] = "ROOT_CREATE_4001"] = "Create root existed"

export default RESPONSE_CODE
