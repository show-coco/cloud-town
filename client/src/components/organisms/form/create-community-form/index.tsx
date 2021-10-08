import { useState, VFC } from "react";
import { BasicInfoForm } from "./basic-info/BasicInfoForm";
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

  switch (step) {
    case 1:
      return <BasicInfoForm onFinish={onFinishStep1} />;
    case 2:
      return <ImageForm onFinish={onFinishStep2} />;
    case 3:
      return <div>カテゴリ</div>;
    default:
      throw new Error();
  }
};
