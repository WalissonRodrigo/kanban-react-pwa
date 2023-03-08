/* eslint-disable no-debugger */
import { useForm } from 'react-hook-form';

import { FormHelperText, TextField, styled } from '@mui/material';

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

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
  const { register, handleSubmit, setError, formState } =
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
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        multiline
        minRows={5}
        label="Content"
        type="content"
        id="content"
        autoComplete="current-content"
        helperText={errors.content ? errors.content.message : ''}
        error={errors.content && errors?.content?.message !== undefined}
        {...register('content')}
      />
      {errors.apiError && <FormHelperText id="apiError">{errors.apiError?.message}</FormHelperText>}
      <ActionButton
        textButtonSubmit={rest.textButtonSubmit}
        type="submit"
        confirm={Function}
        cancel={() => rest.onClose()}
      />
    </FormStyled>
  );
}
