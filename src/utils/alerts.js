// Code written and maintained by Elisee Kajingu
import Swal from 'sweetalert2';

// Success alert
export const showSuccessAlert = (title, text = '') => {
  return Swal.fire({
    icon: 'success',
    title: title,
    text: text,
    timer: 2000,
    timerProgressBar: true,
    showConfirmButton: false
  });
};

// Error alert
export const showErrorAlert = (title, text = '') => {
  return Swal.fire({
    icon: 'error',
    title: title,
    text: text,
    confirmButtonColor: '#3085d6'
  });
};

// Warning alert
export const showWarningAlert = (title, text = '') => {
  return Swal.fire({
    icon: 'warning',
    title: title,
    text: text,
    confirmButtonColor: '#3085d6'
  });
};

// Info alert
export const showInfoAlert = (title, text = '') => {
  return Swal.fire({
    icon: 'info',
    title: title,
    text: text,
    confirmButtonColor: '#3085d6'
  });
};

// Confirmation alert
export const showConfirmAlert = (title, text = '', confirmButtonText = 'Yes', cancelButtonText = 'No') => {
  return Swal.fire({
    icon: 'question',
    title: title,
    text: text,
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: confirmButtonText,
    cancelButtonText: cancelButtonText
  });
};

// Toast notification
export const showToast = (title, icon = 'success', position = 'top-end') => {
  const Toast = Swal.mixin({
    toast: true,
    position: position,
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
  });

  return Toast.fire({
    icon: icon,
    title: title
  });
};

// Loading alert
export const showLoadingAlert = (title = 'Loading...') => {
  return Swal.fire({
    title: title,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });
};

// Close alert
export const closeAlert = () => {
  Swal.close();
};
