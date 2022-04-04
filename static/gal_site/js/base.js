/**
 * Executes a ajax call using jquery.
 * Returns a Promise
 * @param url endpoint to call,
 * @param options jquery ajax options (excluding the `url` options, that will be replaced by the <i>url</i> parameter)
 **/
function ajax(url, options) {
    const optionsObj = {...options, ...{url: url}};
    return new Promise((resolve, reject) => {
        $.ajax(optionsObj).done(resolve).fail(reject);
    });
}
