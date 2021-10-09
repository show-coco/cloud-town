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
  const thumbnailController = useImageController();
  const iconController = useImageController();
  const currentStep = Number(router.query.step || 1);
  const methods = useForm<CreateCommunityFormData>();

  const moveStep = (step: number) => {
    router.push({
      pathname: router.pathname,
      query: {
        step,
      },
    });
  };

  const onSubmit = methods.handleSubmit((values) => {
    // TODO: API叩く
    console.log(values);
    console.log(iconController.image);
    console.log(thumbnailController.image);
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
      return <BodyForm moveStep={moveStep} onClick={onSubmit} {...methods} />;
    default:
      throw new Error("ページが存在しません");
  }
};
