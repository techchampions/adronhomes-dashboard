import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { useMakeGiftRequest } from "../../data/hooks/mutations";
import Button from "../Button";
import CheckboxGroup from "../CheckboxSelectField";
import RadioGroup from "../RadioGroup";
import SelectFieldInput from "../SelectFieldInput";
interface Prop {
  gift: EligibleGift;
  property_id: number;
}
const ClaimGift: React.FC<Prop> = ({ gift, property_id }) => {
  const { mutate, isPending } = useMakeGiftRequest();
  const initialValues = {
    reward_group: "",
    gift: "",
    gifts: [] as string[],
  };
  const gift_with_OR_logic = gift.reward_options.find(
    (item) => item.logic === "OR"
  );
  const gift_with_AND_logic = gift.reward_options.find(
    (item) => item.logic === "AND"
  );
  const validationSchema = Yup.object().shape({
    reward_group: Yup.string().required("Reward group is required"),
    gift: Yup.string().when("reward_group", (reward_group, schema) => {
      const selectedGroup = gift.reward_options.find(
        (item) => Number(reward_group) === item.id
      );
      if (selectedGroup?.logic === "OR") {
        return schema.required("Please select a gift");
      }
      return schema.notRequired();
    }),
    // gifts: Yup.array()
    //   .of(Yup.string())
    //   .when("reward_group", (reward_group, schema) => {
    //     const selectedGroup = gift.reward_options.find(
    //       (item) => Number(reward_group) === item.id
    //     );
    //     if (selectedGroup?.logic === "AND") {
    //       return schema
    //         .min(1, "Please select at least one gift")
    //         .max(12, "Too many items");
    //     }
    //     return schema.notRequired();
    //   }),
  });
  const reward_group_option = gift.reward_options.map((item) => ({
    value: item.id,
    label: `Reward group ${item.id}`,
  }));
  const handleSubmit = (values: typeof initialValues) => {
    const selected_reward_group = gift.reward_options.find(
      (item) => Number(values.reward_group) === item.id
    );
    if (selected_reward_group) {
      const payload = {
        promo_id: gift.promo_id,
        reward_group_id: selected_reward_group?.id,
        property_id: property_id,
        user_note:
          "I am buying this properties and I am interested in the gift",
      };
      mutate(payload);
    }
  };
  return (
    <div className="w-sm max-w-sm">
      <Formik
        initialValues={initialValues}
        validateOnMount
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, isValid }) => {
          const selected_reward_group = gift.reward_options.find(
            (item) => Number(values.reward_group) === item.id
          );
          const gift_options = selected_reward_group?.items.map((item) => ({
            value: String(item.item_id),
            label: `${item.qty} ${item.item_name}`,
          }));

          return (
            <Form className="space-y-6">
              <div className="text-3xl font-adron-bold">Cliam your gifts</div>
              <div className="space-y-4">
                <SelectFieldInput
                  options={reward_group_option}
                  label="Select Reward Group"
                  name="reward_group"
                  placeholder="Select Reward Group"
                />
                {selected_reward_group?.logic === "OR" && gift_options && (
                  <RadioGroup
                    options={gift_options}
                    name="gift"
                    label="Select a single Gift"
                  />
                )}
                {selected_reward_group?.logic === "AND" && gift_options && (
                  <CheckboxGroup
                    name="interests"
                    label="Select your Gifts"
                    options={gift_options}
                    defaultSelectAll
                  />
                )}
              </div>
              <Button
                label="Submit"
                type="submit"
                isLoading={isPending}
                disabled={isPending || !isValid}
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default ClaimGift;
