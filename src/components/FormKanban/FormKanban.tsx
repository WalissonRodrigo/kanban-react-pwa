/* eslint-disable no-debugger */
import { Controller, useForm } from 'react-hook-form';

import { FormControl, FormHelperText, TextField, styled } from '@mui/material';

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Editor } from '@tinymce/tinymce-react';

import { useCardActions } from '@/store/_actions';
import { Card } from '@/store/_state';

import ActionButton from '../ActionButton';

const FormStyled = styled(`form`)(({ theme }) => ({
  width: '100%', // Fix IE 11 issue.
  marginTop: theme.spacing(1),
}));
const ValidationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  content: Yup.string().required('Content is required'),
  status: Yup.string(),
  apiError: Yup.string(),
  id: Yup.string(),
});
type ValidationSchemaProp = Yup.InferType<typeof ValidationSchema>;

export default function FormKanban({ ...rest }) {
  const [, actions] = useCardActions();
  const formOptions = {
    resolver: yupResolver(ValidationSchema),
    defaultValues: {
      id: rest?.card?.id,
      title: rest?.card?.title,
      content: rest?.card?.content,
      status: rest?.card?.status,
    },
  };
  const { control, register, handleSubmit, setError, formState } =
    useForm<ValidationSchemaProp>(formOptions);
  const { errors } = formState;

  const updateCard = (id: string, payload: Card) =>
    actions
      .updateCard(id, payload)
      .then(() => {
        actions.getAll();
        rest.onClose();
      })
      .catch((error) => {
        setError('apiError', { message: error });
      });
  const createCard = (payload: Card) =>
    actions
      .createCard(payload)
      .then(() => {
        actions.getAll();
        rest.onClose();
      })
      .catch((error) => {
        setError('apiError', { message: error });
      });
  function onSubmit(data: ValidationSchemaProp): Promise<void> {
    const payload = data as Card;
    if (payload.id) return updateCard(payload.id, payload);
    return createCard(payload);
  }
  return (
    <FormStyled onSubmit={handleSubmit(onSubmit)}>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="title"
        label="Title"
        autoFocus
        helperText={errors.title ? errors.title.message : ''}
        error={errors.title && errors?.title?.message !== undefined}
        {...register('title')}
      />
      <Controller
        control={control}
        required
        render={({ field }) => (
          <Editor
            apiKey="gs8t6hmd1jb6hs1wf3awog5dshponbrypxp17ylpq2lka3dt"
            initialValue={field.value}
            init={{
              entity_encoding: 'raw',
              plugins: 'link image code',
              toolbar:
                'undo redo | blocks | fontsize | bold italic link quickimage forecolor removeformat | alignleft aligncenter alignright alignjustify | code',
            }}
            onChange={(e) => {
              field.onChange(e.target.getContent());
            }}
            id="content"
          />
        )}
        {...register('content')}
      />

      {errors.apiError && (
        <FormControl
          style={{
            backgroundColor: '#a7505099',
            width: '100%',
            borderRadius: 4,
            minHeight: 24,
            marginTop: 16,
          }}
        >
          <FormHelperText id="apiError">
            <li>{errors.apiError?.message}</li>
          </FormHelperText>
        </FormControl>
      )}
      <ActionButton
        textButtonSubmit={rest.textButtonSubmit}
        type="submit"
        confirm={Function}
        cancel={() => rest.onClose()}
        style={{ marginTop: 6 }}
      />
    </FormStyled>
  );
}
