import { useState, VFC } from "react";
import { BasicInfoForm } from "./basic-info/BasicInfoForm";
import { BodyForm } from "./body/Body";
import { CategoryForm } from "./category/CategoryForm";
import { ImageForm } from "./image/ImageForm";

export const CreateCommunityForm: VFC = () => {
  const [step, setStep] = useState(1);
  // const [formData, setFormData] = useState();

  const onFinishStep1 = () => {
    setStep(2);
  };

  const onFinishStep2 = () => {
    setStep(3);
  };

  const onFinishStep3 = () => {
    setStep(4);
  };

  const onFinishStep4 = () => {
    setStep(5);
  };

  switch (step) {
    case 1:
      return <BasicInfoForm onFinish={onFinishStep1} />;
    case 2:
      return <ImageForm onFinish={onFinishStep2} />;
    case 3:
      return <CategoryForm onFinish={onFinishStep3} />;
    case 4:
      return <BodyForm onFinish={onFinishStep4} />;
    default:
      throw new Error("ページが存在しません");
  }
};
