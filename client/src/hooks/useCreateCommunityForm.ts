import { ApolloError } from "@apollo/client";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { v4 } from "uuid";
import { FirebaseStorageAdapter } from "../adapter/storage/FirebaseStorage";
import { CreateCommunityFormData } from "../components/organisms/form/create-community-form";
import { useAuthContext } from "../context/AuthContext";
import {
  Category_Enum,
  Hashtag_Constraint,
  Hashtag_Update_Column,
  useCreateCommunityMutation,
} from "../graphql/generated/types";
import { useImageController } from "./useImageController";

const FirebaseStorage = new FirebaseStorageAdapter();

export const useCreateCommunityForm = () => {
  const router = useRouter();
  const { user } = useAuthContext();
  const thumbnailController = useImageController();
  const iconController = useImageController();
  const currentStep = Number(router.query.step || 1);
  const methods = useForm<CreateCommunityFormData>({
    defaultValues: {
      categoryId: Category_Enum.Programming,
    },
  });
  const [createCommunity, { data, loading, error }] =
    useCreateCommunityMutation();

  if (data) console.log(data);
  if (error) console.log(error);

  const moveStep = (step: number) => {
    router.push({
      pathname: router.pathname,
      query: {
        step,
      },
    });
  };

  const onSubmit = methods.handleSubmit(async (values) => {
    let iconUrl = "";
    let thumbnailUrl = "";

    const hashtags = values.hashtag
      .split(" ")
      .map((hashtag) => hashtag.trim().substr(1));

    try {
      if (iconController.blob) {
        iconUrl = await FirebaseStorage.storeImage(iconController.blob, v4());
      }

      if (thumbnailController.blob) {
        thumbnailUrl = await FirebaseStorage.storeImage(
          thumbnailController.blob,
          v4()
        );
      }

      const { data } = await createCommunity({
        variables: {
          ...values,
          userId: user?.id,
          description: values.body,
          thumbnailUrl,
          iconUrl,
          categoryId: Category_Enum[values.categoryId as Category_Enum],
          hashtags: hashtags.map((hashtag) => ({
            hashtag: {
              data: {
                name: hashtag,
              },
              on_conflict: {
                constraint: Hashtag_Constraint.HashtagNameKey,
                update_columns: [Hashtag_Update_Column.Name],
              },
            },
          })),
        },
      });
      router.push(`/community/${data?.insert_community_one?.slug}`);
    } catch (error) {
      if (error instanceof ApolloError) {
        console.error(error);
      }
    }
  });

  return {
    currentStep,
    methods,
    thumbnailController,
    iconController,
    loading,
    onSubmit,
    moveStep,
  };
};
