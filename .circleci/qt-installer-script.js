function Controller() {
    installer.installationFinished.connect(proceed)
}

function logCurrentPage() {
    var pageName = page().objectName
    var pagePrettyTitle = page().title
    console.log("At page: " + pageName + " ('" + pagePrettyTitle + "')")
}

function page() {
    return gui.currentPageWidget()
}

function proceed(button, delay) {
    gui.clickButton(button || buttons.NextButton, delay)
}

Controller.prototype.WelcomePageCallback = function() {
    logCurrentPage()
    proceed(buttons.NextButton, 2000)
}

Controller.prototype.CredentialsPageCallback = function() {
    logCurrentPage()
    page().loginWidget.EmailLineEdit.text = installer.environmentVariable("QT_EMAIL");
    page().loginWidget.PasswordLineEdit.text = installer.environmentVariable("QT_PASSWORD");
    proceed()
}

Controller.prototype.IntroductionPageCallback = function() {
    logCurrentPage()
    proceed()
}

Controller.prototype.TargetDirectoryPageCallback = function() {
    logCurrentPage()
    proceed()
}

Controller.prototype.ComponentSelectionPageCallback = function() {
    logCurrentPage()
    page().deselectAll()
    page().selectComponent("qt.qt5.5140.gcc_64")
    proceed()
}

Controller.prototype.LicenseAgreementPageCallback = function() {
    logCurrentPage()
    page().AcceptLicenseRadioButton.checked = true
    gui.clickButton(buttons.NextButton)
}

Controller.prototype.ReadyForInstallationPageCallback = function() {
    logCurrentPage()
    proceed()
}

Controller.prototype.PerformInstallationPageCallback = function() {
    logCurrentPage()
}

Controller.prototype.FinishedPageCallback = function() {
    logCurrentPage()
    page().LaunchQtCreatorCheckBoxForm.launchQtCreatorCheckBox.checked = false
    proceed(buttons.FinishButton)
}

Controller.prototype.DynamicTelemetryPluginFormCallback = function() {
    logCurrentPage()
    console.log(Object.keys(page().TelemetryPluginForm.statisticGroupBox))
    var radioButtons = page().TelemetryPluginForm.statisticGroupBox
    radioButtons.disableStatisticRadioButton.checked = true
    proceed()
}
