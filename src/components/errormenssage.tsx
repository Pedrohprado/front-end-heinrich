const ErrorMenssage = ({ errormenssage }: { errormenssage: string }) => {
  return (
    <p className=' text-center w-full text-red-600 text-sm mt-1'>
      {errormenssage}
    </p>
  );
};

export default ErrorMenssage;
