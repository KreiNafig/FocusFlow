const button = document.querySelector('button') as HTMLButtonElement | never;
button.addEventListener('click', () => {
    console.log('Hello, world')
})
type TId = string;

type ITrack = {
    id: TId;
    title: string;
    artist: string;
    album: string;
    duration: number;
    genre: string;
    year: number;
    isFavorite: boolean;
    isPlaying: boolean;
    isPaused: boolean;
    isStopped: boolean;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    isPending: boolean;
    isIdle: boolean;
    isFetching: boolean;
    isFetched: boolean;
    isFetchedAfterMount: boolean;
    isFetchedOnce: boolean;
    isFetchedAfterRefetch: boolean;
    isFetchedAfterRefetchOnce: boolean;
    isFetchedAfterRefetchTwice: boolean;
}

type IAddres = 'me' | 'playlist';

interface ITrackList extends Array<ITrack> {
    findTrackById(id: TId): ITrack | undefined;
    findTrackByTitle(title: string): ITrack | undefined;
}

export const myTrack: ITrack = {} as ITrack
 
function spotik(address: 'artist', id: string): Promise<unknown>
function spotik(address: 'me', id: string): Promise<ITrack>
function spotik(address: string, id: string): Promise<unknown> {
    return fetch(`https://${address}/${id}`).then(res => res.json())
}

export type { ITrack, ITrackList, IAddres };
export { spotik };


function sss<T extends{value: string}>(arg: T): void {
        arg.
}

sss<ITrack>(myTrack)

type TMusic = {
    
}