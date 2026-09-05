module.exports = {
    default: {
        requireModule: ["ts-node/register"],
        require: ["src/hooks/**/*.ts", "src/steps/**/*.ts"],
        format: ["progress-bar", "json:reports/cucumber.json", "html:reports/cucumber.html"]
    }
};
