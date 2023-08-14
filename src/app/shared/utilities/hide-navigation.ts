const navigationWidth = 250;
const breackPointToHideNavigation = 992;

export function handleHideNavigation(clicked: boolean = false) {
  const windowWidth = window.innerWidth;
  const leftElement = document.getElementsByClassName("left-element")[0];
  const rightElement = document.getElementsByClassName("right-element")[0];
  if (leftElement && rightElement) {
    const left = window.getComputedStyle(leftElement);
    if (clicked) {
      if (left.left === "0px") {
        if (windowWidth < breackPointToHideNavigation) {
          (leftElement as HTMLElement).style.display = "block";
        } else {
          (rightElement as HTMLElement).style.left = `-${navigationWidth}px`;
        }
        (leftElement as HTMLElement).style.left = `-${navigationWidth}px`;
        (rightElement as HTMLElement).style.flex = "1 0 auto";
      } else {
        if (windowWidth < breackPointToHideNavigation) {
          (leftElement as HTMLElement).style.left = "0px";
          (rightElement as HTMLElement).style.left = "0px";
          (rightElement as HTMLElement).style.flex = "1 1 auto";
        } else {
          (leftElement as HTMLElement).style.left = "0px";
          (rightElement as HTMLElement).style.left = "0px";
          (rightElement as HTMLElement).style.flex = "1 1 auto";
        }
      }
    } else {
      if (windowWidth < breackPointToHideNavigation) {
        if (
          (leftElement as HTMLElement).style.left === `-${navigationWidth}px`
        ) {
          (rightElement as HTMLElement).style.left = "0px";
        }
      } else {
        if (left.left === "0px") {
          (rightElement as HTMLElement).style.left = `0px`;
          (rightElement as HTMLElement).style.flex = "1 1 auto";
        } else {
          (rightElement as HTMLElement).style.left = `-${navigationWidth}px`;
          (rightElement as HTMLElement).style.flex = "1 0 auto";
        }
      }
    }
  }
}
