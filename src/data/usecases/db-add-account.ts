import { IAccountModel } from '../../domain/models/account'
import { IAddAccount, IDbAddAccount } from '../../domain/usecases/add-account'

export interface IEncrypter {
  encrypt: (value: string) => Promise<string>
}

export class DbAddAccount implements IDbAddAccount {
  constructor (
    private readonly encrypter: IEncrypter,
    private readonly addAccountRepository: IDbAddAccount
  ) {}

  async add (account: IAddAccount): Promise<IAccountModel> {
    const hashedValue = await this.encrypter.encrypt(account.password)
    console.log(hashedValue)
    const repoAccount = await this.addAccountRepository.add({ ...account, password: hashedValue })
    return repoAccount
  }
}