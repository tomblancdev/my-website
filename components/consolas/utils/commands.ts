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

export class StringField extends CommandField {
  constructor(name: string) {
    super(name, "string");
  }
}

export class NumberField extends CommandField {
  constructor(name: string) {
    super(name, "number");
  }
}

export class BooleanField extends CommandField {
  constructor(name: string) {
    super(name, "boolean");
  }
}

interface paramsInterface {
  params: { [key: string]: string | number | boolean };
  noIdentifiersParams: string[];
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
    // execute the callback with the parameters
    this.callback(commandOptions.params, commandOptions.noIdentifiersParams);
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
