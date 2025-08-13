export function s16LEToSamplesArray(rawSamples: Uint8Array){
    const samplesArray: number[] = [];
    for(let i = 0; i<rawSamples.length / 2; i++){
        const sample1 = rawSamples[2*i];
        const sample2 = rawSamples[2*i+1];
        
        if(sample1 === undefined || sample2 === undefined) continue;
        
        let sample = (sample1 | (sample2 << 8));
        if(sample & 0x8000){
            sample = (sample & 0x7fff) - 0x8000;
        }
        samplesArray.push(sample);
    }
    return samplesArray;
}