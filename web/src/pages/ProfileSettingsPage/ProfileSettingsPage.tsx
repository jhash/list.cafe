import kebabCase from 'lodash/kebabCase'
import { Save, Trash2 } from 'lucide-react'
import {
  CreateImageInput,
  EditUserById,
  PersonVisibility,
  UpdateUserInput,
} from 'types/graphql'

import { Controller, Form } from '@redwoodjs/forms'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

import { useAuth } from 'src/auth'
import { UPDATE_USER_MUTATION } from 'src/components/Admin/User/EditUserCell'
import { CREATE_IMAGE_MUTATION } from 'src/components/DashboardListItem/DashboardListItem'
import { DELETE_IMAGE_MUTATION } from 'src/components/DashboardListItemImages/DashboardListItemImages'
import FormItem from 'src/components/FormItem/FormItem'
import ListFadeOut from 'src/components/ListFadeOut/ListFadeOut'
import Loading from 'src/components/Loading'
import PageTitle from 'src/components/PageTitle/PageTitle'
import UploadImages from 'src/components/UploadImages/UploadImages'
import { LIST_CAFE_DOMAIN } from 'src/constants/urls'

import { ProfileTabs } from '../ProfilePage/ProfilePage'

type ProfileForm = NonNullable<EditUserById['user']>

const PERSON_VISIBILITY_OPTIONS: {
  value: PersonVisibility
  name: string
  description?: string
}[] = [
  {
    value: 'PRIVATE',
    name: 'Private',
    description: 'No one else can view your profile',
  },
  {
    value: 'GROUP',
    name: 'Group',
    description:
      'Anyone from groups that you are a member of can view your profile',
  },
  {
    value: 'PUBLIC',
    name: 'Public',
    description: 'Your profile can be seen by anyone',
  },
]

const ProfileSettingsPage = () => {
  const { currentUser, reauthenticate } = useAuth()

  const { id, person, personId } = currentUser || {}

  const { name, description, pronouns, identifier, visibility } = person || {}

  const [createImageMutation, { loading: createImageLoading }] = useMutation(
    CREATE_IMAGE_MUTATION
  )

  const [deleteImageMutation, { loading: deleteImageLoading }] = useMutation(
    DELETE_IMAGE_MUTATION
  )

  const [updateUserMutation, { loading: updateUserLoading }] =
    useMutation(UPDATE_USER_MUTATION)

  const loading = createImageLoading || deleteImageLoading || updateUserLoading

  const onUpload = async (images: CreateImageInput[]) => {
    for (const image of images) {
      await createImageMutation({
        variables: { input: { ...image, personId: personId } },
      })
    }
    await reauthenticate()
    toast.success('Successfully added images')
  }

  const onDelete = async (id: number) => {
    await deleteImageMutation({ variables: { id } })
    await reauthenticate()
    toast.success('Successfully deleted image')
  }

  const onSubmit = async (input: UpdateUserInput) => {
    await updateUserMutation({ variables: { input, id } })
    await reauthenticate()
    toast.success('Successfully updated profile')
  }

  return (
    <>
      <MetaTags title="ProfileSettings" description="ProfileSettings page" />

      <Form<ProfileForm>
        className="flex w-full max-w-full flex-col gap-3"
        onSubmit={onSubmit}
      >
        <PageTitle>
          <div className="flex-grow">{'Profile'}</div>
          <button
            className="btn btn-secondary flex h-10 min-h-0 w-10 flex-grow-0 items-center justify-center rounded-full p-0"
            type="submit"
            disabled={loading}
          >
            <Save />
          </button>
        </PageTitle>
        <ProfileTabs />
        <div className="flex w-full max-w-full flex-col gap-3">
          <div className="label font-medium">Images</div>
          <div className="flex items-center gap-3 overflow-x-auto pb-3">
            <div className="flex items-center gap-2">
              {(person?.images || []).map(({ url, alt, id }, index) => (
                <div
                  key={index}
                  className="relative flex h-48 w-48 items-center justify-center overflow-hidden rounded-sm border p-2"
                >
                  <button
                    className="btn btn-error absolute right-1 top-1 flex h-8 min-h-0 w-8 flex-grow-0 items-center justify-center rounded-full p-0"
                    title="Delete"
                    type="button"
                    onClick={(event) => {
                      event.preventDefault()
                      event.stopPropagation()

                      return (
                        window?.confirm(
                          'Are you sure you want to delete this image?'
                        ) && onDelete(id)
                      )
                    }}
                    disabled={loading}
                  >
                    <Trash2 size="1rem" />
                  </button>
                  <img src={url} alt={alt} className="w-full" />
                </div>
              ))}
              {!person?.images?.length && (
                <div className="label">No images added yet</div>
              )}
            </div>
          </div>
          <div className="label flex gap-2 font-medium">Add images</div>
          {createImageLoading ? (
            <Loading />
          ) : (
            <UploadImages onUpload={onUpload} />
          )}
          <div className="flex flex-col gap-5">
            <FormItem
              disabled={loading}
              name="person.name"
              defaultValue={name}
              label={'Name'}
              validation={{
                required: {
                  value: true,
                  message: 'Name is required',
                },
              }}
            />
            <FormItem
              disabled={loading}
              name="person.pronouns"
              defaultValue={pronouns}
              label={'Pronouns'}
            />
            <FormItem
              disabled={loading}
              name="person.description"
              defaultValue={description}
              label={'Description'}
              type="textarea"
            />
            <FormItem
              disabled={loading}
              name="person.visibility"
              defaultValue={visibility}
              label={'Visibility'}
              type="select"
              options={PERSON_VISIBILITY_OPTIONS}
            />
            <Controller
              name="person.visibility"
              render={({ field: { value } }) =>
                (value || visibility) === 'PUBLIC' ? (
                  <FormItem
                    onSubmit={onSubmit}
                    disabled={loading}
                    name="person.identifier.id"
                    label={'Handle'}
                    defaultValue={identifier?.id}
                  >
                    <Controller
                      name="person.identifier.id"
                      render={({ field: { value } }) => (
                        <div className="flex items-center p-1 text-sm text-gray-500">
                          {`Ex. ${LIST_CAFE_DOMAIN}/${
                            kebabCase(value) || identifier?.id || 'your-handle'
                          }`}
                        </div>
                      )}
                    />
                  </FormItem>
                ) : null
              }
            />
          </div>
        </div>
      </Form>
      <ListFadeOut />
    </>
  )
}

export default ProfileSettingsPage
