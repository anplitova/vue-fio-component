/**
 * API Service
 *
 */
import { IDataParams, IDataResponse } from '@interfaces/services/api/ApiService.interface'

class ApiService {
  private readonly BASE_PATH: string = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/fio'
  private readonly TOKEN: string ='43b7e62f8b5e35438a657ce267979f961dcb9670'

  /**
   * @description Получение списка фамилий
   */
  public async getData (params: IDataParams): Promise<IDataResponse> {
    const options: RequestInit = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Token ' + this.TOKEN
      },
      body: JSON.stringify(params)
    }

    const response = await fetch(this.BASE_PATH, options)
    return await response.json()
  }
}

export default new ApiService()
