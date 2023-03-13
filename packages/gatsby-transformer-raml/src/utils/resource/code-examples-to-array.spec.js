import codeExamplesToArray from './code-examples-to-array.mjs';

it('should transform objects of code examples to array', () => {
  const codeExamplesBefore = {
    curl: `
    curl -XPOST /{projectKey}/resource -i \
      --header 'Authorization: Bearer YOUR_TOKEN \
      --header 'Content-Type: application/json' \
      --data-binary @- << EOF
      {
        "objectTypeProperty" : {
          "arrayOfIntExample" : [ 1, 2, 1, 3, 2, 3, 1 ],
          "arrayOfUniqueIntExample" : [ 1, 3, 5, 7 ],
          "arrayOfTwonumbersExample" : [ 3, 5 ],
          "arrayOfFloatExample" : [ 0.82 ],
          "arrayOfNumberNoDefaultsExample" : [ 10, 9, 8, 7, 6 ],
          "arrayOfStringExample" : [ "dog", "cat", "bird" ],
          "arrayOfObjectType" : [ {
            "integerExample" : 777,
            "integerExampleInt32" : 1
          }, {
            "integerExample" : 30000,
            "integerExampleInt32" : 22
          } ]
        }
      }
      EOF
    `,
  };

  const codeExamplesAfter = codeExamplesToArray(codeExamplesBefore);

  /* eslint-disable dot-notation */
  expect(codeExamplesAfter[0]['language']).toBe('curl');
  expect(codeExamplesAfter[0]['value']).toBeTruthy();
});
