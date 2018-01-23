const noflo = require('noflo');

exports.getComponent = () => {
  let current_length = 0;

  return new noflo.Component({
    icon: 'cog',
    description: 'Wraps strings to specified length',
    inPorts: {
      in: { datatype: 'string' },
      token_delimiter: { datatype: 'string', control: true },
      wrap_delimiter: { datatype: 'string', control: true },
      length: { datatype: 'number', control: true }
    },
    outPorts: {
      out: { datatype: 'string' }
    },
    process: (input, output) => {
      if (
        !input.hasData('in')
        || !input.hasData('token_delimiter')
        || !input.hasData('wrap_delimiter')
        || !input.hasData('length')
      ) {
        return;
      }

      let token = input.getData('in');
      const token_delimiter = input.getData('token_delimiter');
      const wrap_delimiter = input.getData('wrap_delimiter');
      const length = input.getData('length');

      current_length += token.length;

      if (current_length > length) {
        token = wrap_delimiter + token;
        current_length = token.length + token_delimiter.length;
      } else {
        current_length += token_delimiter.length;
      }

      if (token.includes(wrap_delimiter)) {
        [firstToken, secondToken] = token.split(wrap_delimiter);
        current_length = secondToken.length + token_delimiter.length;
      }

      output.sendDone(token);
    }
  })
};