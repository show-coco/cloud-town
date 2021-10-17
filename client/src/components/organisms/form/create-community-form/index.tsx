import { useCreateCommunityForm } from "client/src/hooks/useCreateCommunityForm";

import { VFC } from "react";
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
  const {
    currentStep,
    methods,
    thumbnailController,
    iconController,
    loading,
    moveStep,
    onSubmit,
  } = useCreateCommunityForm();

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
