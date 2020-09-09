<template>
  <div class="comp-container comp-protocols">
    <h1>Protocol/Command Selection:</h1>

    <!-- Protocol Select Box -->
    <label for="protocol">Protocol:</label>
    <select v-model="selectedProtocol" name="protocol" @change="resetCommand(selectedProtocol)">
      <option
        v-bind:key="protocol.id"
        v-for="protocol in protocols"
        :value="protocol.id"
      >{{ protocol.name }}</option>
    </select>

    <!-- Command Select Box -->
    <label for="command">Command:</label>
    <select
      v-model="selectedCommand"
      name="command"
      @change="resetRequestData(selectedProtocol, selectedCommand)"
    >
      <option
        v-bind:key="command.id"
        v-for="command in commands[selectedProtocol - 1]"
        :value="command.id"
      >{{ command.name }}</option>
    </select>

    <!-- Display Mandatory Fields If They Exist -->
    <div id="mandatory-fields" v-if="mandatoryExists">
      <h1>Mandatory parameters:</h1>
      <div v-for="mandatoryField in mandatoryExists" v-bind:key="mandatoryField.id">
        <ul v-if="Array.isArray(mandatoryField)">
          <li v-for="field in mandatoryField" :key="field.id">
            <label :for="field">{{ field }}</label>
            <input
              type="text"
              ref="mandatoryInput"
              :placeholder="field"
              :name="field"
              @blur="addParamToRequestData(mandatoryField, $event.target.value)"
            />
          </li>
        </ul>
        <div v-else>
          <label :for="mandatoryField">{{ mandatoryField }}:</label>
          <input
            type="text"
            ref="mandatoryInput"
            :placeholder="mandatoryField"
            :name="mandatoryField"
            @blur="addParamToRequestData(mandatoryField, $event.target.value)"
          />
        </div>
      </div>
    </div>

    <!-- Display Optional Fields If They Exist -->
    <div id="optional-fields" v-if="optionalExists">
      <h1>Optional parameters:</h1>
      <div v-for="optionalField in optionalExists" v-bind:key="optionalField.id">
        <label :for="optionalField">{{ optionalField }}:</label>
        <input type="text" ref="optionalInput" :placeholder="optionalField" :name="optionalField" />
      </div>
    </div>
    <!-- Display Complex Fields If They Exist -->
    <div id="complex-fields" v-if="complexExists">
      <h1>Complex Types</h1>
      <div v-for="complexType in complexExists" :key="complexType.name">
        <h2>{{ complexType.name }}</h2>
        <ul>
          <li v-for="field in complexType.fields" :key="field">
            <label :for="field">{{ field }}</label>
            <input
              type="text"
              ref="mandatoryInput"
              :placeholder="field"
              :name="field"
              @blur="
                addParamToRequestData(
                  field,
                  $event.target.value,
                  complexType.name
                )
              "
            />
          </li>
        </ul>
      </div>
    </div>

    <!-- Request button -->
    <button @click="sendRequestInfo(requestData)">Request</button>
  </div>
</template>

<script>
export default {
  name: "Protocols",
  props: ["protocols", "commands"], //End Props
  data() {
    return {
      selectedProtocol: 1,
      selectedCommand: 1,
      requestData: {
        protocol: this.selectedProtocol,
        command: this.selectedCommand,
        params: {},
      },
    };
  }, //End Data
  methods: {
    sendRequestInfo(requestData) {
      this.$emit("send-request-info", requestData);
    },
    // Resets the selected command to the 1st after protocol change
    resetCommand(protocol) {
      this.selectedCommand = 1;
      this.resetRequestData(protocol, this.selectedCommand);
    },
    // Request Data Reset after command change
    resetRequestData(protocol, command) {
      this.clearInputs();
      this.requestData = {
        protocol: protocol,
        command: command,
        params: {},
      };
      // eslint-disable-next-line
      //console.log(this.requestData)
    },
    // Add parameter to request data obj on blur event of input field
    addParamToRequestData(name, value, cType) {
      // eslint-disable-next-line
      console.log("ctype is: " + cType);
      //Check if complex type, then add it
      if (cType) {
        // check if obj for complex type already exist, if not create empty obj
        if (!this.requestData.params[cType]) {
          this.requestData.params[cType] = {};
        }
        this.requestData.params[cType][name] = value;
        // eslint-disable-next-line
        console.log("UPADOH!!!!!!!");
      } else {
        this.requestData.params[name] = value;
      }
      // eslint-disable-next-line
      //console.log(this.requestData)
    },
    // Clear Input Text after command switch
    clearInputs() {
      if (document.getElementById("mandatory-fields")) {
        let mandatoryFields = document.getElementById("mandatory-fields");
        let mandatoryInputs = mandatoryFields.querySelectorAll(
          "input[type=text]"
        );
        for (var i = 0; i < mandatoryInputs.length; i++) {
          mandatoryInputs[i].value = "";
        }
      }

      if (document.getElementById("optional-fields")) {
        let optionalFields = document.getElementById("optional-fields");
        let optionalInputs = optionalFields.querySelectorAll(
          "input[type=text]"
        );
        for (i = 0; i < optionalInputs.length; i++) {
          optionalInputs[i].value = "";
        }
      }
    },
  }, //End Methods
  computed: {
    // Check if mandatory fields for command exist, return those fields
    mandatoryExists: function () {
      if (
        this.commands[this.selectedProtocol - 1][this.selectedCommand - 1]
          .mandatory !== undefined
      ) {
        let mandatoryFields = this.commands[this.selectedProtocol - 1][
          this.selectedCommand - 1
        ].mandatory;
        return mandatoryFields;
      }
      return false;
    },
    // Check if optional parameter for command exist, return those fields
    optionalExists: function () {
      if (
        this.commands[this.selectedProtocol - 1][this.selectedCommand - 1]
          .optional !== undefined
      ) {
        let optionalFields = this.commands[this.selectedProtocol - 1][
          this.selectedCommand - 1
        ].optional;
        return optionalFields;
      }
      return false;
    },
    complexExists: function () {
      if (
        this.commands[this.selectedProtocol - 1][this.selectedCommand - 1]
          .complex !== undefined
      ) {
        let complexFields = this.commands[this.selectedProtocol - 1][
          this.selectedCommand - 1
        ].complex;
        return complexFields;
      }
      return false;
    },
  }, //End Computed
  created() {
    //Set request data to default value onload
    this.resetRequestData(1, 1);
  }, //End
}; //End Export Default
</script>

<style scoped>
ul {
  border: 1px solid #d1d1d1;
  padding: 20px;
  background: #f3f3f3;
  margin-bottom: 20px;
}
</style>
