function o(n,a){let r=[];for(let e of n.edges)e.from===a&&r.push({node:e.to,edge:e}),!n.directed&&e.to===a&&r.push({node:e.from,edge:e});return r}export{o as a};
