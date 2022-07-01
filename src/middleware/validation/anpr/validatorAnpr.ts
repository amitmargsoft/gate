import { Request, Response, NextFunction } from 'express';
import validator from 'validator';

import { CustomError } from 'utils/response/custom-error/CustomError';
import { ErrorValidation } from 'utils/response/custom-error/types';

export const validatorAnpr = (req: Request, res: Response, next: NextFunction) => {
  let { vehicle_type, timestamp, vehicle_no, vf_image_path, vf_video_path, anpr_image_path, anpr_video_path } = req.body;
  const errorsValidation: ErrorValidation[] = [];




  anpr_video_path = !anpr_video_path ? '' : anpr_video_path;
  vehicle_type = !vehicle_type ? '' : vehicle_type;
  timestamp = !timestamp ? '' : timestamp;
  vehicle_no = !vehicle_no ? '' : vehicle_no;
  vf_image_path = !vf_image_path ? '' : vf_image_path;
  anpr_image_path = !anpr_image_path ? '' : anpr_image_path;
  vf_video_path = !vf_video_path ? '' : vf_video_path;

  if (validator.isEmpty(anpr_video_path)) {
    errorsValidation.push({ anpr_video_path: 'anpr_video_path field is required' });
  }

  console.log(vehicle_type)
  if (validator.isEmpty(anpr_image_path)) {
    errorsValidation.push({ anpr_image_path: 'anpr_image_path field is required' });
  }
  if (validator.isEmpty(vf_video_path)) {
    errorsValidation.push({ vf_video_path: 'vf_video_path field is required' });
  }
  if (validator.isEmpty(vf_image_path)) {
    errorsValidation.push({ vf_image_path: 'vf_image_path field is required' });
  }
  if (validator.isEmpty(vehicle_no)) {
    errorsValidation.push({ vehicle_no: 'vehicle_no field is required' });
  }
  if (validator.isEmpty(timestamp)) {
    errorsValidation.push({ timestamp: 'timestamp field is required' });
  }
  if (validator.isEmpty(vehicle_type)) {
    errorsValidation.push({ vehicle_type: 'vehicle_type field is required' });
  }
  
  if (errorsValidation.length !== 0) {
    const customError = new CustomError(400, 'Validation', 'Anpr validation error', null, null, errorsValidation);
    return next(customError);
  }
  return next();
};
