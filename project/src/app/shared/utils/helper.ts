export function isMacPlatform(): boolean {
  if ('userAgentData' in navigator) {
    return (navigator as any).userAgentData.platform?.toLowerCase().includes('mac');
  }

  return navigator.userAgent.toLowerCase().includes('mac');
}
