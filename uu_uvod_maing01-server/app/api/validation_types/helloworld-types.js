/* eslint-disable */

const helloWorldGreetingDtoInType = shape({
  greeting: string().isRequired(),
  sufix: string(),
});

const helloWorldGreetListDtoInType = shape({});

const helloWorldGreetCreateDtoInType = shape({
  name: string().isRequired(),
  category: array(id()),
  text: string().isRequired(),
});
