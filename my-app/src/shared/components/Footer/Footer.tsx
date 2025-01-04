import { APP_NAME, APP_VERSION } from "@shared/utils/api/configs/URL";
// my-app/src/components/Footer.tsx
const Footer = () => {
  return (
    <div className='flex justify-center font-Roboto font-extralight text-xl mt-10'>
        &copy; 2023 {APP_NAME} VERSION {APP_VERSION}
    </div>
  );
};

export default Footer;