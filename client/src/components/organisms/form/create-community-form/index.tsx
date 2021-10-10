import { ApolloError } from "@apollo/client";
import { useAuthContext } from "client/src/context/AuthContext";
import {
  Category_Enum,
  Hashtag_Constraint,
  Hashtag_Update_Column,
  useCreateCommunityMutation,
} from "client/src/graphql/generated/types";
import { useImageController } from "client/src/hooks/useImageController";
import { useRouter } from "next/router";
import { VFC } from "react";
import { useForm } from "react-hook-form";
import { BasicInfoForm } from "./basic-info/BasicInfoForm";
import { BodyForm } from "./body/BodyForm";
import { CategoryForm } from "./category/CategoryForm";
import { ImageForm } from "./image/ImageForm";

export type CreateCommunityFormData = {
  name: string;
  title: string;
  slug: string;
  categoryId: string;
  hashtag: string;
  body: string;
};

export const CreateCommunityForm: VFC = () => {
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

  console.log(data);
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
    console.log(iconController.image);
    console.log(thumbnailController.image);

    const thumbnailUrl = "";
    const iconUrl = "";
    const hashtags = values.hashtag
      .split(" ")
      .map((hashtag) => hashtag.trim().substr(1));

    try {
      await createCommunity({
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
    } catch (error) {
      if (error instanceof ApolloError) {
        console.error(error);
      }
    }
  });

  switch (currentStep) {
    case 1:
      return <BasicInfoForm moveStep={moveStep} {...methods} />;
    case 2:
      return (
        <ImageForm
          moveStep={moveStep}
          thumbnail={thumbnailController}
          icon={iconController}
        />
      );
    case 3:
      return <CategoryForm moveStep={moveStep} {...methods} />;
    case 4:
      return (
        <BodyForm
          moveStep={moveStep}
          onClick={onSubmit}
          loading={loading}
          {...methods}
        />
      );
    default:
      throw new Error("ページが存在しません");
  }
};
