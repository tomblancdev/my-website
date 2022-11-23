interface paramsInterface {
  params: { [key: string]: string | number | boolean };
  noIdentifiersParams: string[];
}
/**
 * Configuration of each param into a Command config object
 */
export class CommandField {
  /**
   * Check if param is valid
   * @param name name of the parameter used into the callback function
   * @param type type of the parameter used into the callback function
   */
  constructor(
    public name: string,
    public type: "string" | "number" | "boolean"
  ) {}

  /**
   * Get the value from the string to the correct type
   * @param value string value of the params
   */
  getValueFromString(value: string): string | number | boolean {
    switch (this.type) {
      case "string":
        return value;
      case "number":
        let number = Number(value);
        if (isNaN(number)) {
          throw new Error(`Invalid number`);
        }
        return number;
      case "boolean":
        if (value === ("true" || 1)) {
          return true;
        } else if (value === ("false" || 0)) {
          return false;
        }
        throw new Error("Invalid boolean value");
    }
  }
  /**
   * Get a key value pair of the param name and the value
   * @param value value to be converted and checked
   */
  getObjectFromValue(value: string): {
    [key: string]: string | number | boolean;
  } {
    return { [this.name]: this.getValueFromString(value) };
  }
}

/**
 * String field for commands
 */
export class StringField extends CommandField {
  /**
   *
   * @param name name of the parameter used into the callback function
   */
  constructor(name: string) {
    super(name, "string");
  }
}

/**
 * Number field for commands
 */
export class NumberField extends CommandField {
  /**
   *
   * @param name name of the parameter used into the callback function
   */
  constructor(name: string) {
    super(name, "number");
  }
}

/**
 * Boolean field for commands
 */
export class BooleanField extends CommandField {
  /**
   *
   * @param name name of the parameter used into the callback function
   */
  constructor(name: string) {
    super(name, "boolean");
  }
}

/**
 * Result object due to command execution
 */
export class CommandResult {
  /**
   *
   * @param result result of the command execution
   * @param type type of the result
   */
  constructor(
    public type: "success" | "error" | "warning",
    public result?: any
  ) {}
}

/**
 * Error object due to command execution
 */
export class ErrorResult extends CommandResult {
  /**
   *
   * @param result result of the command execution
   */
  constructor(result?: any) {
    super("error", result);
  }
}

/**
 * Warning object due to command execution
 */
export class WarningResult extends CommandResult {
  /**
   *
   * @param result result of the command execution
   */
  constructor(result?: any) {
    super("warning", result);
  }
}

/**
 * Success object due to command execution
 */
export class SuccessResult extends CommandResult {
  /**
   *
   * @param result result of the command execution
   */
  constructor(result?: any) {
    super("success", result);
  }
}

/**
 * A new Command configuration
 */
export class CommandConfig {
  /**
   *
   * @param fields parameters of the command
   * @param callback callback function of the command
   */
  constructor(
    public fields: { [key: string]: CommandField },
    public callback: (
      params: { [key: string]: string | number | boolean },
      noIdentifiersParams: string[]
    ) => any
  ) {}

  /**
   * Check if command is valid and execute it if it is
   * @param params params to be passed to the callback function
   */
  execute(params: string[]) {
    // get each pair of param value from the params array
    let commandOptions = this.getParams(params);
    // execute the callback with the parameters and return the result
    return this.callback(
      commandOptions.params,
      commandOptions.noIdentifiersParams
    );
  }

  /**
   * Get the params from the command parameters and apply the config to values passed
   * @param paramsArray array of params to be checked
   */
  getParams(paramsArray: string[]): paramsInterface {
    let params = {};
    let noIdentifierParams = [];
    for (let i = 0; i < paramsArray.length; i++) {
      if (paramsArray[i] in this.fields) {
        // get the param config for the param
        let paramConfig = this.fields[paramsArray[i]];
        try {
          // set the value to params using the next value in the array
          let param = paramConfig.getObjectFromValue(paramsArray[i + 1]);
          // increment i to skip the next value
          i++;
          // add the param to the params object
          params = { ...params, ...param };
        } catch (e) {
          if (e instanceof Error) {
            throw new Error(
              "Error : " +
                '"' +
                e.message +
                '" ' +
                paramsArray[i + 1] +
                " on parameter " +
                paramsArray[i]
            );
          }
        }
      } else {
        // if the param is not in the config  add it to a list of params without identifiers
        noIdentifierParams.push(paramsArray[i]);
      }
    }
    return { params: params, noIdentifiersParams: noIdentifierParams };
  }
}

export class HistoryItem {
  constructor(public command: string, public result: CommandResult) {}
}
