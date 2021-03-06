import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { withRouter } from 'react-router-dom';

import { INVENTORY_FIELDS, INVENTORY_TITLES } from '../utils/constants';
import {
  FormBox,
  FieldBox,
  ButtonBox,
  Button,
  Error
} from '../utils/sharedStyles';
import InputField from '../InputField';

const TitleField = ({ input, label, meta }) => {
  return (
    <FieldBox>
      <label>{label}</label>
      <select {...input}>
        <option selected="selected" />
        {INVENTORY_TITLES.map(({ value, title }) => (
          <option key={value} value={value}>
            {title}
          </option>
        ))}
      </select>
      <Error>{meta.touched && meta.error}</Error>
    </FieldBox>
  );
};

class InventoryForm extends Component {
  render() {
    return (
      <FormBox>
        <form onSubmit={this.props.handleSubmit(this.props.onListSubmit)}>
          <FieldBox>
            <Field
              label="Categories"
              type="text"
              name="title"
              component={TitleField}
            />
          </FieldBox>
          <FieldBox>
            <Field
              label="Items"
              type="text"
              name="list"
              component={InputField}
            />
          </FieldBox>
          <ButtonBox>
            <Button
              onClick={() => this.props.history.push('/dashboard')}
              type="button"
              color="#b60009"
            >
              Cancel
            </Button>
            <Button type="submit" color="#016025">
              Review &rarr;
            </Button>
          </ButtonBox>
        </form>
      </FormBox>
    );
  }
}

function validate(values) {
  const errors = {};
  INVENTORY_FIELDS.map(({ name, errorMessage }) => {
    if (!values[name]) {
      errors[name] = errorMessage;
    }
    return errors;
  });

  return errors;
}

export default reduxForm({
  validate,
  form: 'inventoryForm',
  destroyOnUnmount: false
})(withRouter(InventoryForm));
