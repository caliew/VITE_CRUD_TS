import { Modal, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

import { Button } from '@shared/components';

const { Text } = Typography;

interface Props {
  onClose: () => void;
  customText: string;
}

const UpdateFormSuccess = ({ customText, onClose }: Props) => {
  const { t } = useTranslation();

  const handleCloseModal = () => {
    onClose();
    Modal.destroyAll();
  };

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <Text>{customText}</Text>
      <Button block className="mt-6" onClick={handleCloseModal}>
        {t('button.ok')}
      </Button>
    </div>
  );
};

export default UpdateFormSuccess;
