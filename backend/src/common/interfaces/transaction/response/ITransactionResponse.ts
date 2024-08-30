import { IsUUID } from 'class-validator';
import { UUID } from 'crypto';
import { ITransaction } from '../base';

export interface ITransactionResponse extends ITransaction {}
