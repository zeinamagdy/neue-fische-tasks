import { NotFoundException, Type } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

/**
 * Validates the result and transforms it into a DTO instance.
 *
 * @param result The database or service query result.
 * @param responseDto The DTO class to transform the result into.
 * @param entityName Custom entity name for the NotFoundException message.
 */
export const returnResponse = <T, V>(
  result: T | null | undefined,
  responseDto: Type<V>,
  entityName = 'Resource'
): V => {
  if (!result) {
    throw new NotFoundException(`${entityName} not found`);
  }

  return plainToInstance(responseDto, result, {
    excludeExtraneousValues: true,
  });
};