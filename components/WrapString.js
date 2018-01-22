const noflo = require('noflo');

exports.getComponent = () => new noflo.Component({
  icon: 'cog',
  description: 'Wraps strings to length provided',
  inPorts: {
    in: { datatype: 'string' }
  },
  outPorts: {
    out: { datatype: 'string' }
  },
  process: (input, output) => {
    if (!input.hasData('in')) {
      return;
    }

    output.sendDone({ out: input.getData('in') });
  }
});