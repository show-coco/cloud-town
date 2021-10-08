import { useRouter } from "next/router";
import { VFC } from "react";
import { BasicInfoForm } from "./basic-info/BasicInfoForm";
import { BodyForm } from "./body/BodyForm";
import { CategoryForm } from "./category/CategoryForm";
import { ImageForm } from "./image/ImageForm";

export const CreateCommunityForm: VFC = () => {
  // const [formData, setFormData] = useState();
  const router = useRouter();
  const currentStep = Number(router.query.step || 1);

  const moveStep = (step: number) => {
    router.push({
      pathname: router.pathname,
      query: {
        step,
      },
    });
  };

  const backStep = () => {
    moveStep(currentStep - 1);
  };

  const onFinishStep1 = () => {
    moveStep(2);
  };

  const onFinishStep2 = () => {
    moveStep(3);
  };

  const onFinishStep3 = () => {
    moveStep(4);
  };

  const onFinishStep4 = () => {
    // TODO: API叩く
  };

  switch (currentStep) {
    case 1:
      return <BasicInfoForm onFinish={onFinishStep1} />;
    case 2:
      return <ImageForm onFinish={onFinishStep2} backStep={backStep} />;
    case 3:
      return <CategoryForm onFinish={onFinishStep3} backStep={backStep} />;
    case 4:
      return <BodyForm onFinish={onFinishStep4} backStep={backStep} />;
    default:
      throw new Error("ページが存在しません");
  }
};
