type Props = {
  text: string;
  noroundedborders?: boolean;
};

function CustomText({ text, noroundedborders }: Props) {
  return (
    <div
      className={`flex w-full items-center justify-center ${
        !noroundedborders && 'rounded-lg'
      } mt-5 bg-faded py-5`}
    >
      <p className="font-open-sans font-semibold text-secondary2">{text}</p>
    </div>
  );
}

export default CustomText;
