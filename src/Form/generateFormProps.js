import serverCommunicationHelper from "central-middleware";

export default function generateFormProps(values) {
  const {
    parameters,
    apiUrl,
    apiActionType,
    requestType,
    reduxActionType,
    mode,
    isServerDriven = true,
  } = values;
  const removeDuplicateButtons = (buttons) => {
    const uniqueButtons = [];
    const seenTypes = new Set();

    for (const button of buttons) {
      if (!seenTypes.has(button.type)) {
        uniqueButtons.push(button);
        seenTypes.add(button.type);
      }
    }

    return uniqueButtons;
  };
  const addSubmitButtonAfterLastStep = (steps) => {
    const updatedSteps = [...steps]; // Create a shallow copy of steps
    const lastStepIndex = updatedSteps.length - 1;

    // Ensure there is at least one step
    if (lastStepIndex >= 0) {
      // Initialize buttons array if not present
      if (!updatedSteps[lastStepIndex].buttons) {
        updatedSteps[lastStepIndex].buttons = [];
      } else {
        // Clean up duplicate buttons
        updatedSteps[lastStepIndex].buttons = removeDuplicateButtons(
          updatedSteps[lastStepIndex].buttons
        );
      }

      // Check if "submit" button already exists in the last step
      const submitButtonExists = updatedSteps[lastStepIndex].buttons.some(
        (button) => button.type === "submit"
      );

      // Add the "submit" button only if it doesn't already exist
      if (!submitButtonExists) {
        updatedSteps[lastStepIndex].buttons.push({
          type: "submit",
          label: "Submit",
        });
      }
    }

    return updatedSteps;
  };

  // Add the button to the steps
  const updatedSteps = addSubmitButtonAfterLastStep(parameters.steps);
  return {
    data: {
      features: {
        submission: {
          steps: updatedSteps,
          serverCommunication: serverCommunicationHelper({
            parameters,
            apiUrl,
            apiActionType,
            requestType: requestType,
            reduxActionType,
          }),
        },
        fetchData: {
          serverCommunication: serverCommunicationHelper({
            parameters,
            apiUrl,
            apiActionType: "",
            requestType: "GET",
            reduxActionType,
          }),
        },
      },
    },
    config: {
      viewMode: {
        presentation: "modalView",
        mode: mode,
      },
      features: {
        submission: { enable: true, operationalMode: "server" },
        fetchData: { enable: true, operationalMode: "server" },
        submission: {
          enable: isServerDriven,
          operationalMode: isServerDriven ? "server" : "local",
        },
        fetchData: {
          enable: isServerDriven,
          operationalMode: isServerDriven ? "server" : "local",
        },
      },
    },
    appearance: {
      features: {
        submission: {
          button: [
            {
              type: "confirm",
              backgroundColor: "#fff",
              color: "#fff",
            },
          ],
        },
      },
    },
  };
}
