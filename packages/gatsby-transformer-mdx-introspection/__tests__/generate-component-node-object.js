const generateComponentNodeObject = require('../src/generate-component-node-object');

describe('generate-component-node-object.js', () => {
  it('transforms certain JSX fragments into objects representing the top level tag', () => {
    expect(
      generateComponentNodeObject(
        '<ApiType apiKey=test type=OutOfOrderPropertiesTestType />'
      )
    ).toEqual({
      attributes: [
        {
          name: 'apikey',
          value: 'test',
        },
        {
          name: 'type',
          value: 'OutOfOrderPropertiesTestType',
        },
      ],
      component: 'apitype',
    });

    expect(
      // a full example from the react JS homepage, should not throw parse errors
      generateComponentNodeObject(
        '<div><h3>TODO</h3><TodoList items={this.state.items} /><form onSubmit={this.handleSubmit}><label htmlFor="new-todo">What needs to be done?</label><input id="new-todo" onChange={this.handleChange} value={this.state.text} /> <button>Add #{this.state.items.length + 1}</button></form></div>'
      )
    ).toEqual({
      attributes: [],
      component: 'div',
    });

    expect(
      // a full example from the react JS homepage, should not throw parse errors
      generateComponentNodeObject(
        '<ul>{this.props.items.map(item => (<li key={item.id}>{item.text}</li>))}</ul>'
      )
    ).toEqual({
      attributes: [],
      component: 'ul',
    });

    expect(
      // a full example from the react JS homepage, should not throw parse errors
      generateComponentNodeObject(
        '<div className="content" dangerouslySetInnerHTML={this.getRawMarkup()} />'
      )
    ).toEqual({
      attributes: [
        {
          name: 'classname',
          value: 'content',
        },
        {
          name: 'dangerouslysetinnerhtml',
          value: '{this.getRawMarkup()}',
        },
      ],
      component: 'div',
    });
  });
});
