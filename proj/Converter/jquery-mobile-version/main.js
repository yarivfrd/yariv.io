    let distanceConvertField = document.querySelector('#distance #conversion-value');
    let temperatureConvertField = document.querySelector('#temperature #conversion-value');
    let timeConvertField = document.querySelector('#time #conversion-value');

    let distanceUnitSelector = document.querySelector('#distance #unit-select');
    let temperatureUnitSelector = document.querySelector('#temperature #unit-select');
    let timeUnitSelector = document.querySelector('#time #unit-select');

    distanceConvertField.addEventListener('keyup', () => convert(distanceConvertField, 'distance'));
    temperatureConvertField.addEventListener('keyup', () => convert(temperatureConvertField, 'temperature'));
    timeConvertField.addEventListener('keyup', () => convert(timeConvertField, 'time'));

    distanceUnitSelector.addEventListener('change', () => convert(distanceConvertField, 'distance'));
    temperatureUnitSelector.addEventListener('change', () => convert(temperatureConvertField, 'temperature'));
    timeUnitSelector.addEventListener('change', () => convert(timeConvertField, 'time'));

    function convert(field, unit) {

        let fieldValue = field.value;
        let outputArr = document.querySelectorAll('#' + unit + ' output');

        switch (document.querySelector('#' + unit + ' #unit-select').value) {

            // Distance
            case "kilometers":
                outputArr[0].value = fieldValue; // KILOMETERS
                outputArr[1].value = (fieldValue * 0.62137).toFixed(2); // MILES
                outputArr[2].value = (fieldValue / 0.000010000).toFixed(2); // CENTIMETERS
                outputArr[3].value = (fieldValue * 39370).toFixed(2); // INCHES
                break;
            case "miles":
                outputArr[0].value = (fieldValue / 0.62137).toFixed(2); // KILOMETERS
                outputArr[1].value = fieldValue; // MILES
                outputArr[2].value = (fieldValue / 0.0000062137).toFixed(2); // CENTIMETERS
                outputArr[3].value = (fieldValue * 63360).toFixed(2); // INCHES
                break;
            case "centimeters":
                outputArr[0].value = (fieldValue / 100000).toFixed(6); // KILOMETERS
                outputArr[1].value = (fieldValue * 0.0000062137).toFixed(6); // MILES
                outputArr[2].value = fieldValue; // CENTIMETERS
                outputArr[3].value = (fieldValue * 0.39370).toFixed(3); // INCHES
                break;
            case "inches":
                outputArr[0].value = (fieldValue / 39370).toFixed(6); // KILOMETERS
                outputArr[1].value = (fieldValue * 0.000015783).toFixed(6); // MILES
                outputArr[2].value = (fieldValue / 0.39370).toFixed(3); // CENTIMETERS
                outputArr[3].value = fieldValue; // INCHES
                break;

                // Temperature
            case "celsius":
                outputArr[0].value = fieldValue; // CELSIUS
                outputArr[1].value = (fieldValue * 1.8000 + 32.00).toFixed(2); // FAHRENHEIT
                break;
            case "fahrenheit":
                outputArr[0].value = ((fieldValue - 32) / 1.8000).toFixed(2); // CELSIUS
                outputArr[1].value = fieldValue; // FAHRENHEIT
                break;

                // Time
            case "milliseconds":
                outputArr[0].value = fieldValue; // MILLISECONDS
                outputArr[1].value = fieldValue * 0.001; // SECONDS
                outputArr[2].value = (fieldValue * 0.0000166667).toFixed(3); // MINUTES
                outputArr[3].value = (fieldValue * 0.000000277778).toFixed(3); // HOURS
                outputArr[4].value = (fieldValue * 0.0000000115741).toFixed(3); // DAYS
                break;
            case "seconds":
                outputArr[0].value = (fieldValue * 1000); // MILLISECONDS
                outputArr[1].value = fieldValue; // SECONDS
                outputArr[2].value = (fieldValue * 0.0166667).toFixed(3); // MINUTES
                outputArr[3].value = (fieldValue * 0.000277778).toFixed(3); // HOURS
                outputArr[4].value = (fieldValue * 0.0000115741).toFixed(3); // DAYS
                break;
            case "minutes":
                outputArr[0].value = (fieldValue * 60000); // MILLISECONDS
                outputArr[1].value = (fieldValue * 60); // SECONDS
                outputArr[2].value = fieldValue; // MINUTES
                outputArr[3].value = (fieldValue * 0.0166667).toFixed(3); // HOURS
                outputArr[4].value = (fieldValue * 0.000694444).toFixed(3); // DAYS
                break;
            case "hours":
                outputArr[0].value = (fieldValue * 3600000); // MILLISECONDS
                outputArr[1].value = (fieldValue * 3600); // SECONDS
                outputArr[2].value = (fieldValue * 60); // MINUTES
                outputArr[3].value = fieldValue; // HOURS
                outputArr[4].value = (fieldValue * 0.0416667).toFixed(3); // DAYS
                break;
            case "days":
                outputArr[0].value = (fieldValue * 86400000); // MILLISECONDS
                outputArr[1].value = (fieldValue * 86400); // SECONDS
                outputArr[2].value = (fieldValue * 1440); // MINUTES
                outputArr[3].value = (fieldValue * 24); // HOURS
                outputArr[4].value = fieldValue; // DAYS
                break;
        }
        checkResult(field, outputArr);
    }

    // Actions
    function checkResult(field, outputArr) {

        // Checks if input is empty
        if (field.value === "") {
            for (var i = 0; i < outputArr.length; i++) {
                outputArr[i].value = "...";
            }
        }

        // Checks if result is too long
        for (var i = 0; i < outputArr.length; i++) {
            if (outputArr[i].value.length >= 13) {
                outputArr[i].value = Number(outputArr[i].value).toExponential(7);
            }
        }

    }