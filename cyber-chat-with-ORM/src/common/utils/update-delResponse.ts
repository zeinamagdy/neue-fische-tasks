import { NotFoundException } from '@nestjs/common';
export const UpdateOrdelResponse = (result,operation: string,object: string) => {
  if (result.affected === 0)
    throw new NotFoundException(
      `${object} not found or you are not authorized to edit it`,
    );

    
  return {
    statusCode: 200,
    message: `${object} ${operation} successfully`,
  };
};
