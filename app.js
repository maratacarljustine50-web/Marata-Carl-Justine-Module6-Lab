// ======================================================
// PURE VALIDATION FUNCTIONS
// These functions must not access document or window.
// ======================================================

function isValidStudentNumber(value) {

    return /^\d{2}-\d{4}-\d{3}$/.test(value.trim());
}


function isValidPassword(value) {

    // IMPORTANT:
    // Do NOT trim the password.
    // Spaces are not allowed anywhere.

    return (
        value.length >= 8 &&
        /[A-Z]/.test(value) &&
        /\d/.test(value) &&
        /[@$!]/.test(value) &&
        !/\s/.test(value)
    );
}


// ======================================================
// BROWSER CODE
// ======================================================

if (typeof document !== "undefined") {

    document.addEventListener("DOMContentLoaded", function () {

        const form =
            document.getElementById("registrationForm");

        const fullName =
            document.getElementById("fullName");

        const studentNumber =
            document.getElementById("studentNumber");

        const email =
            document.getElementById("email");

        const mobileNumber =
            document.getElementById("mobileNumber");

        const password =
            document.getElementById("password");

        const confirmPassword =
            document.getElementById("confirmPassword");

        const course =
            document.getElementById("course");

        const terms =
            document.getElementById("terms");


        // Error elements

        const fullNameError =
            document.getElementById("fullNameError");

        const studentNumberError =
            document.getElementById("studentNumberError");

        const emailError =
            document.getElementById("emailError");

        const mobileNumberError =
            document.getElementById("mobileNumberError");

        const passwordError =
            document.getElementById("passwordError");

        const confirmPasswordError =
            document.getElementById("confirmPasswordError");

        const courseError =
            document.getElementById("courseError");

        const termsError =
            document.getElementById("termsError");


        // Other required elements

        const passwordFeedback =
            document.getElementById("passwordFeedback");

        const successMessage =
            document.getElementById("successMessage");

        const registrationSummary =
            document.getElementById("registrationSummary");


        // Summary elements

        const summaryName =
            document.getElementById("summaryName");

        const summaryStudentNumber =
            document.getElementById("summaryStudentNumber");

        const summaryEmail =
            document.getElementById("summaryEmail");

        const summaryMobileNumber =
            document.getElementById("summaryMobileNumber");

        const summaryCourse =
            document.getElementById("summaryCourse");


        // ==================================================
        // ERROR HELPER
        // ==================================================

        function showError(field, errorElement, message) {

            errorElement.textContent = message;

            field.setAttribute("aria-invalid", "true");
        }


        function clearError(field, errorElement) {

            errorElement.textContent = "";

            field.setAttribute("aria-invalid", "false");
        }


        // ==================================================
        // FULL NAME
        // ==================================================

        function validateFullName() {

            const value = fullName.value.trim();

            if (value.length < 2) {

                showError(
                    fullName,
                    fullNameError,
                    "Enter a full name with at least two characters."
                );

                return false;
            }

            clearError(fullName, fullNameError);

            return true;
        }


        // ==================================================
        // STUDENT NUMBER
        // ==================================================

        function validateStudentNumber() {

            const value = studentNumber.value.trim();

            if (!isValidStudentNumber(value)) {

                showError(
                    studentNumber,
                    studentNumberError,
                    "Enter a student number in the format 24-1234-123."
                );

                return false;
            }

            clearError(
                studentNumber,
                studentNumberError
            );

            return true;
        }


        // ==================================================
        // EMAIL
        // ==================================================

        function validateEmail() {

            const value = email.value.trim();

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(value)) {

                showError(
                    email,
                    emailError,
                    "Enter a valid email address."
                );

                return false;
            }

            clearError(email, emailError);

            return true;
        }


        // ==================================================
        // MOBILE NUMBER
        // ==================================================

        function validateMobileNumber() {

            const value =
                mobileNumber.value.trim();

            const mobilePattern =
                /^(09\d{9}|\+639\d{9})$/;

            if (!mobilePattern.test(value)) {

                showError(
                    mobileNumber,
                    mobileNumberError,
                    "Enter 09 followed by nine digits or +639 followed by nine digits. No spaces or hyphens."
                );

                return false;
            }

            clearError(
                mobileNumber,
                mobileNumberError
            );

            return true;
        }


        // ==================================================
        // PASSWORD
        // ==================================================

        function validatePassword() {

            const value = password.value;

            if (!isValidPassword(value)) {

                showError(
                    password,
                    passwordError,
                    "Password must have at least 8 characters, one uppercase letter, one digit, and one of @, $, or !, with no spaces."
                );

                return false;
            }

            clearError(password, passwordError);

            return true;
        }


        // ==================================================
        // CONFIRM PASSWORD
        // ==================================================

        function validateConfirmPassword() {

            const value =
                confirmPassword.value;

            if (
                value === "" ||
                value !== password.value
            ) {

                showError(
                    confirmPassword,
                    confirmPasswordError,
                    "Confirm password must match the password exactly."
                );

                return false;
            }

            clearError(
                confirmPassword,
                confirmPasswordError
            );

            return true;
        }


        // ==================================================
        // COURSE
        // ==================================================

        function validateCourse() {

            if (
                course.value !== "BSIT" &&
                course.value !== "BSCS"
            ) {

                showError(
                    course,
                    courseError,
                    "Please select BSIT or BSCS."
                );

                return false;
            }

            clearError(course, courseError);

            return true;
        }


        // ==================================================
        // TERMS
        // ==================================================

        function validateTerms() {

            if (!terms.checked) {

                showError(
                    terms,
                    termsError,
                    "You must agree to the terms and conditions."
                );

                return false;
            }

            clearError(terms, termsError);

            return true;
        }


        // ==================================================
        // PASSWORD LIVE FEEDBACK
        // ==================================================

        function updatePasswordFeedback() {

            const value = password.value;

            if (value === "") {

                passwordFeedback.textContent = "";

                return;
            }

            const missingRequirements = [];


            if (value.length < 8) {

                missingRequirements.push(
                    "at least 8 characters"
                );
            }


            if (!/[A-Z]/.test(value)) {

                missingRequirements.push(
                    "one uppercase letter"
                );
            }


            if (!/\d/.test(value)) {

                missingRequirements.push(
                    "one digit"
                );
            }


            if (!/[@$!]/.test(value)) {

                missingRequirements.push(
                    "one of @, $, or !"
                );
            }


            if (/\s/.test(value)) {

                missingRequirements.push(
                    "no spaces"
                );
            }


            if (missingRequirements.length === 0) {

                passwordFeedback.textContent =
                    "Password meets all requirements.";

            } else {

                passwordFeedback.textContent =
                    "Password needs: " +
                    missingRequirements.join(", ") +
                    ".";
            }
        }


        // ==================================================
        // CLEAR ALL ERRORS
        // ==================================================

        function clearAllErrors() {

            clearError(
                fullName,
                fullNameError
            );

            clearError(
                studentNumber,
                studentNumberError
            );

            clearError(
                email,
                emailError
            );

            clearError(
                mobileNumber,
                mobileNumberError
            );

            clearError(
                password,
                passwordError
            );

            clearError(
                confirmPassword,
                confirmPasswordError
            );

            clearError(
                course,
                courseError
            );

            clearError(
                terms,
                termsError
            );
        }


        // ==================================================
        // CLEAR SUCCESS AND SUMMARY
        // ==================================================

        function clearSuccessAndSummary() {

            successMessage.textContent = "";

            successMessage.style.display = "none";

            registrationSummary.style.display = "none";

            summaryName.textContent = "";

            summaryStudentNumber.textContent = "";

            summaryEmail.textContent = "";

            summaryMobileNumber.textContent = "";

            summaryCourse.textContent = "";

            passwordFeedback.textContent = "";
        }


        // ==================================================
        // FORM SUBMIT
        // ==================================================

        form.addEventListener("submit", function (event) {

            event.preventDefault();

            clearSuccessAndSummary();


            const validFullName =
                validateFullName();

            const validStudentNumber =
                validateStudentNumber();

            const validEmail =
                validateEmail();

            const validMobileNumber =
                validateMobileNumber();

            const validPassword =
                validatePassword();

            const validConfirmPassword =
                validateConfirmPassword();

            const validCourse =
                validateCourse();

            const validTerms =
                validateTerms();


            const allValid =
                validFullName &&
                validStudentNumber &&
                validEmail &&
                validMobileNumber &&
                validPassword &&
                validConfirmPassword &&
                validCourse &&
                validTerms;


            if (!allValid) {

                return;
            }


            // ==================================================
            // SUCCESS
            // ==================================================

            successMessage.textContent =
                "Registration details validated successfully!";

            successMessage.style.display = "block";


            // ==================================================
            // SUMMARY
            // Do not display password.
            // ==================================================

            summaryName.textContent =
                fullName.value.trim();

            summaryStudentNumber.textContent =
                studentNumber.value.trim();

            summaryEmail.textContent =
                email.value.trim();

            summaryMobileNumber.textContent =
                mobileNumber.value.trim();

            summaryCourse.textContent =
                course.value;


            registrationSummary.style.display =
                "block";
        });


        // ==================================================
        // FULL NAME BLUR
        // ==================================================

        fullName.addEventListener("blur", function () {

            fullName.value =
                fullName.value.trim();

            validateFullName();
        });


        // ==================================================
        // STUDENT NUMBER BLUR
        // ==================================================

        studentNumber.addEventListener("blur", function () {

            studentNumber.value =
                studentNumber.value.trim();

            validateStudentNumber();
        });


        // ==================================================
        // EMAIL BLUR
        // ==================================================

        email.addEventListener("blur", function () {

            email.value =
                email.value.trim();

            validateEmail();
        });


        // ==================================================
        // MOBILE BLUR
        // ==================================================

        mobileNumber.addEventListener("blur", function () {

            mobileNumber.value =
                mobileNumber.value.trim();

            validateMobileNumber();
        });


        // ==================================================
        // PASSWORD INPUT
        // ==================================================

        password.addEventListener("input", function () {

            updatePasswordFeedback();

            if (password.value !== "") {

                validatePassword();
            }
        });


        // ==================================================
        // CONFIRM PASSWORD INPUT
        // ==================================================

        confirmPassword.addEventListener(
            "input",
            function () {

                if (confirmPassword.value !== "") {

                    validateConfirmPassword();
                }
            }
        );


        // ==================================================
        // COURSE CHANGE
        // ==================================================

        course.addEventListener(
            "change",
            function () {

                validateCourse();
            }
        );


        // ==================================================
        // TERMS CHANGE
        // ==================================================

        terms.addEventListener(
            "change",
            function () {

                validateTerms();
            }
        );


        // ==================================================
        // RESET
        // ==================================================

        form.addEventListener("reset", function () {

            setTimeout(function () {

                clearAllErrors();

                clearSuccessAndSummary();

            }, 0);
        });

    });
}


// ======================================================
// AUTOGRADER / NODE.JS EXPORT
// ======================================================

if (
    typeof module !== "undefined" &&
    module.exports
) {

    module.exports = {
        isValidStudentNumber,
        isValidPassword
    };
}