
import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export const dateRangeValidation: ValidatorFn =
(formGroup: AbstractControl): ValidationErrors | null => {
  const initialDate = formGroup.get('initialDate');
  const finalDate = formGroup.get('finalDate');

  if (!initialDate!.value || !finalDate!.value) {
    return null
  }

  const inDate = new Date(initialDate!.value);
  const fiDate = new Date(finalDate!.value);
  if (inDate <= fiDate) {
    return null
  } else {
    return {
      isEndDateLowerThanInitialDate:true
    }
  }
}
