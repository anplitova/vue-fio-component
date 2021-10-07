export interface ISuggestion {
  data: {
    gender: 'MALE' | 'FEMALE' | 'UNKNOWN'
  }
  value: string
}

export interface IDataResponse {
  suggestions: ISuggestion[]
}

export interface IDataParams {
  query: string
  count: number
}
