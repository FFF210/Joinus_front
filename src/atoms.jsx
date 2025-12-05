import { atomWithStorage, createJSONStorage } from 'jotai/utils';
// 제안(지성)
const initProposal = ({id:'',memberUsername:'',productName:'',originalSiteUrl:'',originalPrice:'',abroadShippingCost:'',category:'',description:'',imageUrl:'',additionalImagesFileId:''
                        ,voteCount:'',status:'',rejectReason:'',gbProductId:''});




export const proposalAtom = atomWithStorage('proposal', initProposal, createJSONStorage(()=>sessionStorage));