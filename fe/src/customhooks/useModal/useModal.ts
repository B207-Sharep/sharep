import { modalDataState } from '@/stores/atoms/modal';
import { useRecoilState } from 'recoil';

export const useModal = <FormData extends { [key: string]: any }>(modalId: string) => {
  const [modalData, setModalData] = useRecoilState(modalDataState(modalId));

  const openModal = (initialFormData: Partial<FormData> = {}) => {
    setModalData({
      isOpen: true,
      formData: { ...initialFormData },
    });
  };

  const closeModal = () => {
    setModalData(oldModalData => ({
      ...oldModalData,
      isOpen: false,
    }));
  };

  const updateFormData = (newFormData: Partial<FormData>) => {
    setModalData(oldModalData => ({
      ...oldModalData,
      formData: { ...oldModalData.formData, ...newFormData },
    }));
    // console.log('update', newFormData);
  };

  return { openModal, closeModal, updateFormData };
};
