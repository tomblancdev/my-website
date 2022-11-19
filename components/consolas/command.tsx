import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useKeyDown } from "../hooks/keyEvents";

/**
 * Configuration of each param into a Command config object
 */
class ParamConfig {
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

interface paramsInterface {
  params: { [key: string]: string | number | boolean };
  noIdentifiersParams: string[];
}

/**
 * A new Command configuration
 */
class CommandConfig {
  /**
   *
   * @param parameters parameters of the command
   * @param callback callback function of the command
   */
  constructor(
    public parameters: { [key: string]: ParamConfig },
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
      if (paramsArray[i] in this.parameters) {
        // get the param config for the param
        let paramConfig = this.parameters[paramsArray[i]];
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

export default function MyCommand() {
  let [command, setCommand] = useState("");
  let keyPressed = useKeyDown();
  const router = useRouter();

  let dist = {
    cd: new CommandConfig(
      { "-p": new ParamConfig("path", "string") },
      (params, noIdentifiersParams) => {
        if (noIdentifiersParams.length > 1) {
          throw new Error("Invalid command options : Too many options");
        } else if (
          noIdentifiersParams.length + Object.keys(params).length ===
          0
        ) {
          router.push("/");
        }
        let path =
          (params.path as string) || (noIdentifiersParams[0] as string);
        if (path) {
          router.push(path, path, { shallow: true });
        }
      }
    ),
  };

  useEffect(() => {
    // if (keyPressed) {
    //   if ("abcdefghijklmnopqrstuvwxyz0123456789 ".includes(keyPressed.key)) {
    //     setCommand((prev) => prev + keyPressed?.key);
    //   } else if (keyPressed?.key === "Backspace") {
    //     setCommand((prev) => prev.slice(0, -1));
    //   } else if (keyPressed?.key === "Enter") {
    //     if (command.split(" ")[0] === "cd") {
    //       let path = "/" + (command.split(" ")[1] ? command.split(" ")[1] : "");
    //     }
    //     setCommand("");
    //   }
    // }

    if (keyPressed) {
      if ("abcdefghijklmnopqrstuvwxyz0123456789- ".includes(keyPressed.key)) {
        setCommand((prev) => prev + keyPressed?.key);
      } else if (keyPressed?.key === "Backspace") {
        setCommand((prev) => prev.slice(0, -1));
      } else if (keyPressed?.key === "Enter") {
        if (command.split(" ")[0] in dist) {
          let cmd = command.split(" ")[0] as keyof typeof dist;
          try {
            dist[cmd].execute(command.split(" ").slice(1));
          } catch (e) {
            if (e instanceof Error) {
              console.log(e.message);
            }
          }
        }
        setCommand("");
      }
    }
  }, [keyPressed]);

  return (
    <span className="text-white flex flex-row">
      <p className="whitespace-pre">{command}</p>
      <p className="text-white animate-ping">|</p>
    </span>
  );
}
