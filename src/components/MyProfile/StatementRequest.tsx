import { Form, Formik } from "formik";
import * as Yup from "yup";
import Button from "../Button";
import { useModalStore } from "../../zustand/useModalStore";
import DatePickerInput from "../DatePickerInput";
import { useUserStore } from "../../zustand/UserStore";
import { useRequestStatement } from "../../data/hooks";
import { formatDate } from "../../data/utils";

const StatementRequest = () => {
  const { mutate: requestStatement, isPending, data } = useRequestStatement();
  const { closeModal } = useModalStore();
  const { user } = useUserStore();
  const today = new Date();
  const initialValues = {
    startDate: "",
    endDate: "",
  };
  const validationSchema = Yup.object({
    startDate: Yup.date()
      .nullable()
      .required("Start Date is required")
      .max(today, "Start Date cannot be in the future"),
    endDate: Yup.date().nullable().required("Required"),
  });

  return (
    <div>
      <div className="flex flex-col absolute top-4 left-8">
        <h4 className="font-bold text-xl">Request Statment</h4>
        <p className="text-gray-500 text-sm">Select duration of statement.</p>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          requestStatement(
            {
              start_date: formatDate(values.startDate),
              end_date: formatDate(values.endDate),
            },
            {
              onSuccess: (data) => {
                if (data?.file) {
                  const link = document.createElement("a");
                  link.href = data.file;
                  link.download = "account-statement.pdf";
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                  closeModal(); // Optionally close the modal after download
                }
              },
            }
          );
        }}
      >
        {({ isSubmitting }) => (
          <Form className="mt-14 space-y-4">
            <DatePickerInput
              label="Start Date"
              name="startDate"
              minDate={user?.created_at ? new Date(user.created_at) : undefined}
              maxDate={new Date()}
            />
            <DatePickerInput
              label="End Date"
              name="endDate"
              minDate={user?.created_at ? new Date(user.created_at) : undefined}
              maxDate={new Date()}
            />
            <div className="flex justify-between mt-12">
              <Button
                label="Cancel"
                className="bg-transparent !text-black  text-sm"
                onClick={closeModal}
              />
              <Button
                label="Get"
                type="submit"
                isLoading={isSubmitting || isPending}
                disabled={isPending || isSubmitting}
                className="bg-black px-6 text-sm"
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default StatementRequest;
